import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import { OrganicResult, TextAds } from "@/types";
import styles from '../styles/Home.module.css';
import { FaSearch, FaChevronDown, FaNewspaper, FaImage, FaVideo, FaEllipsisH, FaTimes, FaChevronUp } from 'react-icons/fa';

const products = [
  { title: "Alchemist Holographic", price: "$10.00", description: "Perfect for Highlighting" },
  { title: "Brow Struck Dimension", price: "$8.00", description: "Natural Brow Powder" },
  { title: "Everlasting Glimmer", price: "$5.00", description: "Ultimate Liquid Lipstick" },
  { title: "Another Product", price: "$12.00", description: "Some description" },
  { title: "More Products", price: "$7.00", description: "Some description" },
  { title: "Even More Products", price: "$15.00", description: "Some description" },
  { title: "Even More Products 2", price: "$152.00", description: "Some description" },
  { title: "Even More Products 3", price: "$105.00", description: "Some description" },
  { title: "Even More Products 4", price: "$1058.00", description: "Some description" },
  { title: "Even More Products 5", price: "$10.00", description: "Some description" },
  { title: "Even More Products 6", price: "$107.00", description: "Some description" },
  { title: "Even More Products 7", price: "$18.00", description: "Some description" },
  { title: "Even More Products 8", price: "$15.00", description: "Some description" },
  { title: "Even More Products 9", price: "$100.00", description: "Some description" },
  // Add more products as needed
];


function Index() {
  const [textAds, setTextAds] = useState<TextAds | null>(null);
  const [organicResults, setOrganicResults] = useState<OrganicResult[]>([]);

  useEffect(() => {
    if (textAds) {
      setOrganicResults(textAds.organic_results);
    }
  }, [textAds])


  const [searchText, setSearchText] = useState('');
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const itemsPerPage = 4;

  

  return (
    <Layout setTextAds={setTextAds}>
      <div className={styles.container}>
        {/* <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <FaTimes className={styles.clearIcon} onClick={handleClear} />
            )}
            <FaSearch className={styles.searchIcon} />
          </div>
        </div> */}

        {/* Navigation Menu for computer mode */}
        <div className={styles.navMenu}>
          <span className={styles.navItem}>
            <FaSearch className={styles.icon} />
            All
          </span>
          <span className={styles.navItem}>
            <FaNewspaper className={styles.icon} />
            News
          </span>
          <span className={styles.navItem}>
            <FaImage className={styles.icon} />
            Images
          </span>
          <span className={styles.navItem}>
            <FaVideo className={styles.icon} />
            Videos
          </span>
          <span className={styles.navItem}>
            <FaEllipsisH className={styles.icon} />
            More
          </span>
          {/* Dropdown Button */}
          <div className={styles.simpleDropdown}>
            <select className={styles.simpleDropdownSelect}>
              <option>Anytime</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        <p className={styles.adText}>About 19,5000 search results</p>

        {/* Ads Section */}
        <div className={styles.adsContainer}>
          {/* Left Side - 70% */}
          <div className={styles.adsLeft}>
            <div className={styles.adHeader}>
              <p className={styles.adText}>Add related to: Kat Von D</p>
              <a href="#" className={styles.adLink}>www.kvdveganbeauty.com</a>
              <span className={styles.adTitle}>KVD Beauty Official Site - Good Apple Is Back In Stock</span>
              <p className={styles.adText}>New Releases · Exclusive Sets · 100% Cruelty Free</p>
            </div>

            {/* Products */}
            <div className={styles.adContent}>
          {products.slice(currentStartIndex, currentStartIndex + itemsPerPage).map((product, index) => (
            <div key={index} className={styles.adCard}>
              <h3 className={styles.addCardh3}>{product.title}</h3>
              <p className={styles.addCardhp}>{product.price}</p>
              <p>{product.description}</p>
              {index === 3 && (
                <div className={styles.arrowContainer}>
                  <div className={styles.arrowCircle}>
             <p className={styles.arrowIcon}>  ᐳ </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

            {/* Related Searches */}
            <div className={styles.relatedSearches}>
              <div className={styles.relatedHeader}>
                <h4>People also search for</h4>
                <FaTimes className={styles.relatedCloseIcon} />
              </div>
              <div className={styles.searchLinks}>
                <a href="#">kat von d makeup</a>
                <a href="#">kat von d eyeliner</a>
                <a href="#">rafael reyes</a>
                <a href="#">oliver peck</a>
                <a href="#">kat von d foundation</a>
                <a href="#">kat von d baby</a>
                <a href="#">kat von d tattoos</a>
                <a href="#">kat von d instagram</a>
              </div>
            </div>

            <div className={styles.relatedSearches}>
              <div className={styles.relatedHeader}>
                <h4>People also search for</h4>
                <FaTimes className={styles.relatedCloseIcon} />
              </div>
              <div className={styles.searchLinks}>
                <a href="#">kat von d makeup</a>
                <a href="#">kat von d eyeliner</a>
                <a href="#">rafael reyes</a>
                <a href="#">oliver peck</a>
                <a href="#">kat von d foundation</a>
                <a href="#">kat von d baby</a>
                <a href="#">kat von d tattoos</a>
                <a href="#">kat von d instagram</a>
              </div>
            </div>
          </div>

          {/* Right Side - 30% */}
          <div className={styles.adsRight}>


            <div className={styles.productCard}>
              <img src="/offer-image.jpg" alt="Offer Image" className={styles.productImage} />
              <div className={styles.productInfo}>
                <a href="#" className={styles.productTitle}>Kat Von D Alchemist Holographic Brow Struck Dimension</a>
                <div className={styles.productPrice}>
                  <span className={styles.discountedPrice}> $8.00</span>
                  <span className={styles.originalPrice}>$10.00</span>

                </div>
                <p className={styles.productDiscount}>20% off for a limited time!</p>
              </div>
            </div>


            <div className={styles.productCard}>
              <img src="/offer-image.jpg" alt="Offer Image" className={styles.productImage} />
              <div className={styles.productInfo}>
                <a href="#" className={styles.productTitle}>Kat Von D Alchemist Holographic Brow Struck Dimension</a>
              </div>
            </div>

            <div className={styles.productCard}>
              <img src="/offer-image.jpg" alt="Offer Image" className={styles.productImage} />
              <div className={styles.productInfo}>
                <a href="#" className={styles.productTitle}>Kat Von D Alchemist Holographic Brow Struck Dimension</a>
                <div className={styles.productPrice}>
                  <span className={styles.discountedPrice}> $8.00</span>
                  <span className={styles.originalPrice}>$10.00</span>

                </div>
                <p className={styles.productDiscount}>20% off for a limited time!</p>
              </div>
            </div>

          </div>



        </div>
      </div>


      {/* <div className={`flex items-center justify-center text-center ${textAds === null ? 'block h-full' : 'hidden'}`}>
        <Image
          src="/assets/images/empty.png"
          width={247}
          height={204}
          className="rounded-full w-96 h-auto"
          alt="image description"
          priority={true}
        />
      </div> */}
      <div className={`flex pl-20 pr-20 mt-5 ${textAds !== null ? 'block' : 'hidden'}`}>
        <div>
          {organicResults && organicResults.map((result: OrganicResult, index: number) => {
            return (
              <div key={index} className="mb-10">
                <div className="flex">
                  <div className="flex items-center justify-center rounded-full mr-2">
                    <div className="bg-slate-200 p-2 rounded-full">
                      <Image src={result.favicon} width={24} height={24} alt="empty" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs">{result.title}</p>
                    <a href={result.link} className="text-xs">{result.link}</a>
                  </div>
                </div>
                <div className="mt-1 mb-1">
                  <a href={result.link} className="text-2xl hover:underline text-indigo-600">{result.title}</a>
                </div>
                <div>
                  <p>{result.snippet}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>


  );
}
export default Index;
