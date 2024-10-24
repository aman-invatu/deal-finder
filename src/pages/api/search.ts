import { generateAccessToken, generateJWT, getIpAddress } from "@/utils/helper";
import { NextRequest, NextResponse } from 'next/server';

// export const config = {
//   api: {
//     // This sets the route to run with the Edge runtime
//     externalResolver: true,
//   },
// };

export const config = {
  runtime: 'edge', // for Edge API Routes only
  unstable_allowDynamic: [
    // allows a single file
    '/lib/helper.ts',
    // use a glob to allow anything in the function-bind 3rd party module
    '/node_modules/function-bind/**',
  ],
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  // if query is null, then return 400 error.
  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const jwt = await generateJWT();
    const access_token = await generateAccessToken();

    if (access_token) {
      const headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Auth-Method": "OAuth2",
        "Authorization": `Bearer ${access_token}`,
      };

      // Get the current ipAddress
      const userIP = await getIpAddress();
      console.log('User IP:', userIP);

      if (!userIP) {
        return NextResponse.json({ error: "Failed to get user IP" }, { status: 500 });
      }

      let url = process.env.NEXT_PUBLIC_APP_YAHOO_URL;
      url += `?appid=${process.env.NEXT_PUBLIC_APP_YAHOO_APPID}`;
      url += `&query=${encodeURIComponent(query)}`;
      url += `&market=${encodeURIComponent("en-US")}`;
      url += `&uIP=${userIP}`;
      url += `&serveUrl=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_YAHOO_SERVEURL!)}`;
      url += `&features=ads.north`;
      url += `&ads-sitelinkBolding=1`;
      url += `&ads-bolding=1`;
      url += `&adType=adtype123`;
      url += `&ads.north-count=1`;
      url += `&adSourceTag=brandclick_s2s_sapip_3161_goog_dealfindr2`;

      console.log('Request URL:', url);
      if (!url) {
        throw new Error("URL is undefined");
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
      });

      const data = await response.json();
      console.log('API Response Data:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        console.log('Error: Failed to fetch data from Yahoo Search API');
        throw new Error(`Failed to fetch data from Yahoo Search API: ${response.statusText}`);
      } else {
        console.log('Successful API Response:', JSON.stringify(data, null, 2));
        return NextResponse.json(data);
      }
    } else {
      throw new Error("Failed to generate access token");
    }
  } catch (error: any) {
    console.error('Error in handler:', error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}
