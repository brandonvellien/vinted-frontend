import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Home = ({ search }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <main className="home-container">
      <div className="home-card">
        {!isLoading &&
          data &&
          data.offers.map((article) => (
            <Link to={`/offers/${article._id}`} key={article._id}>
              <div key={article._id} className="card-container">
                <div className="card-avatar-username">
                  <img
                    src={article.owner.account.avatar?.secure_url}
                    alt={article.owner.account.username}
                  />
                  <span>{article.owner.account.username}</span>
                </div>

                <img
                  className="w-full  h-80 object-cover"
                  src={article.product_image.secure_url}
                  alt={article.product_name}
                />

                <div className="image-infos">
                  <div className="price-size-brand">
                    <span>{article.product_price} €</span>

                    <span>{article.product_details[1]?.TAILLE}</span>

                    <span>{article.product_details[0]?.MARQUE}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </main>
  );
};

export default Home;
