import { capitalizeWords } from "@/utils/helper";
import Head from "next/head";
import React, {
  useEffect,
  useState,
  ReactNode,
  ChangeEventHandler,
  useCallback,
} from "react";
import axios from "axios";
import Loading from "./Loading";
import Link from "next/link";

export const runtime = 'edge';

type LayoutProps = {
  children: ReactNode;
  setTextAds: Function;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  setTextAds,
}: LayoutProps) => {
  const [host, setHost] = useState("");
  const [title, setTitle] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [existData, setExistData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getResult = useCallback(
    async (query: string) => {
      setIsLoading(true);
      const response = await axios.get("/api/search?query=" + query);
      if (response.status === 200) {
        const data = response.data;
        setTextAds(data);
        setIsLoading(false);
      }
    },
    [setTextAds]
  );

  useEffect(() => {
    const currentHost = window.location.hostname;
    setHost(currentHost);
    if (
      window.localStorage.getItem("query") !== null &&
      window.localStorage.getItem("query") !== ""
    ) {
      setInputValue(window.localStorage.getItem("query")!);
      getResult(window.localStorage.getItem("query")!);
      setExistData(true);
    }
  }, [getResult]);

  useEffect(() => {
    if (host !== "") {
      setTitle(
        capitalizeWords(host.replace(/^www\./, "").replace(/\.com$/, ""))
      ); // remove 'www.' or '.com'
    }
  }, [host]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    localStorage.setItem("query", event.target.value);
    setInputValue(event.target.value);
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      // Perform action when Enter key is pressed
      if (inputValue !== "") {
        getResult(inputValue);
      }
    }
  };

  const handleButtonClick = async () => {
    // Perform action when Enter key is pressed
    if (inputValue !== "") {
      getResult(inputValue);
    }
  };

  const getStyle = () => {
    if (existData) return 'p-4';
    else return 'p-4 h-full';
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="relative container-fluid mx-auto flex flex-col">
      <Head>
        <title>Deal Finder</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header className="bg-white-800 p-4 border-b shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)]">
        <div className="flex items-center">
          <Link href="/" className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0,0,256,256"
              width="40px"
              height="40px"
              className="sm:ml-0 md:ml-20 lg:ml-20 xl:ml-20"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <g transform="translate(0.0006,256.0006) rotate(-90) scale(3.2,3.2)">
                  <path
                    d="M6.998,77.5c-1.202,0 -2.331,-0.468 -3.181,-1.317c-1.753,-1.753 -1.753,-4.607 0,-6.36l36.828,-35.11l4.656,4.661l-35.131,36.817c-0.841,0.841 -1.971,1.309 -3.172,1.309z"
                    fill="#b6c9d6"
                  ></path>
                  <path
                    d="M40.636,35.411l3.966,3.97l-34.777,36.448c-0.756,0.755 -1.759,1.171 -2.827,1.171c-1.068,0 -2.072,-0.416 -2.827,-1.171c-1.559,-1.559 -1.559,-4.095 -0.017,-5.637l36.482,-34.781M40.654,34.013l-37.19,35.456c-1.952,1.952 -1.951,5.116 0,7.068c0.976,0.975 2.255,1.463 3.534,1.463c1.279,0 2.558,-0.488 3.534,-1.464l35.468,-37.17l-5.346,-5.353z"
                    fill="#788b9c"
                  ></path>
                  <g>
                    <path
                      d="M52,53.5c-14.061,0 -25.5,-11.439 -25.5,-25.5c0,-14.061 11.439,-25.5 25.5,-25.5c14.061,0 25.5,11.439 25.5,25.5c0,14.061 -11.439,25.5 -25.5,25.5z"
                      fill="#d1edff"
                    ></path>
                    <path
                      d="M52,3c13.785,0 25,11.215 25,25c0,13.785 -11.215,25 -25,25c-13.785,0 -25,-11.215 -25,-25c0,-13.785 11.215,-25 25,-25M52,2c-14.359,0 -26,11.641 -26,26c0,14.359 11.641,26 26,26c14.359,0 26,-11.641 26,-26c0,-14.359 -11.641,-26 -26,-26z"
                      fill="#788b9c"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold mx-5 ml-1">{title}</h1>
            </div>
          </Link>
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-[0_0_20px_-5px_rgba(0,0,0,0.3)]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-1 px-2 focus:outline-none max-w-60"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button type="button" onClick={handleButtonClick} className="ml-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0,0,256,256"
                width="24px"
                height="24px"
                className="sm:ml-0 md:ml-20 lg:ml-20 xl:ml-20"
              >
                <g
                  fill="none"
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  textAnchor="none"
                >
                  <g transform="translate(0.0006,256.0006) rotate(-90) scale(3.2,3.2)">
                    <path
                      d="M6.998,77.5c-1.202,0 -2.331,-0.468 -3.181,-1.317c-1.753,-1.753 -1.753,-4.607 0,-6.36l36.828,-35.11l4.656,4.661l-35.131,36.817c-0.841,0.841 -1.971,1.309 -3.172,1.309z"
                      fill="#b6c9d6"
                    ></path>
                    <path
                      d="M40.636,35.411l3.966,3.97l-34.777,36.448c-0.756,0.755 -1.759,1.171 -2.827,1.171c-1.068,0 -2.072,-0.416 -2.827,-1.171c-1.559,-1.559 -1.559,-4.095 -0.017,-5.637l36.482,-34.781M40.654,34.013l-37.19,35.456c-1.952,1.952 -1.951,5.116 0,7.068c0.976,0.975 2.255,1.463 3.534,1.463c1.279,0 2.558,-0.488 3.534,-1.464l35.468,-37.17l-5.346,-5.353z"
                      fill="#788b9c"
                    ></path>
                    <g>
                      <path
                        d="M52,53.5c-14.061,0 -25.5,-11.439 -25.5,-25.5c0,-14.061 11.439,-25.5 25.5,-25.5c14.061,0 25.5,11.439 25.5,25.5c0,14.061 -11.439,25.5 -25.5,25.5z"
                        fill="#d1edff"
                      ></path>
                      <path
                        d="M52,3c13.785,0 25,11.215 25,25c0,13.785 -11.215,25 -25,25c-13.785,0 -25,-11.215 -25,-25c0,-13.785 11.215,-25 25,-25M52,2c-14.359,0 -26,11.641 -26,26c0,14.359 11.641,26 26,26c14.359,0 26,-11.641 26,-26c0,-14.359 -11.641,-26 -26,-26z"
                        fill="#788b9c"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <main className={getStyle()}>{children}</main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <a
          href="https://brandclick.com/privacy-policy/"
          target="_blank"
          className="mr-4"
        >
          Privacy Policy
        </a>
        <a
          href="https://brandclick.com/terms-of-service/"
          target="_blank"
          className="mr-4"
        >
          Terms of Service
        </a>
        <a href="https://brandclick.com/contact-us/" target="_blank">
          Contact Us
        </a>
      </footer>
    </div>
  );
};

export default Layout;
