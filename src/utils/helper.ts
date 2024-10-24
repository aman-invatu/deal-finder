import https from 'https';

const clientId = '8a5a1638-9231-45a1-89e5-086f41e1f86b';
const clientSecret = 'xwlzSxWo0XJSHf7U/I1mAFjg7fv6NwxhaYvp8S5/HVkF4suX4Q';
const host = 'https://id.b2b.yahooinc.com';
const path = '/identity/oauth2/access_token';
const realm = 'sagw';
  
// second 2nd

const b64encode = (str: string): string => {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const urlsafe = (str: string): string => {
  return str.replace(/\+/g, '-');
};

export const generateJWT = async (): Promise<string> => {
  const jwtHeader = JSON.stringify({ alg: 'HS256', typ: 'JWT' }).replace(' ', '');
  const aud = `${host}${path}?realm=${realm}`;
  const issueTime = Math.floor(Date.now() / 1000);
  const duration = 60 * 10; // 10 minutes
  const expiryTime = issueTime + duration;
  const jwtBody = JSON.stringify({
    iss: clientId,
    sub: clientId,
    aud: aud,
    exp: expiryTime,
    iat: issueTime,
  }).replace(' ', '');

  const header = urlsafe(b64encode(jwtHeader));
  const body = urlsafe(b64encode(jwtBody));
  const message = `${header}.${body}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(clientSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, data);
  const sigKey = b64encode(String.fromCharCode(...Array.from(new Uint8Array(signature))));
  const jwt = `${message}.${sigKey}`;
  console.log('Generated JWT:', jwt);  // Log the generated JWT
  return jwt;
};

export const generateAccessToken = async (): Promise<string> => {
  const jwt = await generateJWT();
  
  const identityHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
  };

  const identityBody = {
    'grant_type': 'client_credentials',
    'client_assertion_type': 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    'client_assertion': jwt,
    realm,
    scope: 'sdata',
  };

  const bodyData = Object.entries(identityBody)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  try {
    const response = await fetch(`${host}${path}`, {
      method: 'POST',
      headers: identityHeaders,
      body: bodyData,
    });

    console.log('Token generation response status:', response.status);
    console.log('Token generation response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('Raw Identity API response:', responseText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(responseText);
    const accessToken = data.access_token;
    console.log('Generated Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Identity API call failed:', error);
    throw error;
  }
};

// The capitalizeWords and getIpAddress functions remain unchanged
export const capitalizeWords = (str: string) => {
  const words = str.split(' ');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(' ');
};

export const getIpAddress = async () => {
  try {
    const _ipurl = await fetch('https://hutils.loxal.net/whois');
    const data = await _ipurl.json();
    return data.ip;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};
