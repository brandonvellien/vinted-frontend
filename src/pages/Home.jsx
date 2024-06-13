import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <section>
        <h1>Page Home</h1>
        <div className="header-container">
          <img src="" alt="" />
          <div className="home-ready">
            <h1>Prêts à faire du tri dans vos placards?</h1>
            <button>Commencer à vendre</button>
          </div>
        </div>
        <div className="home-card">
          {!isLoading &&
            data &&
            data.offers.map((article) => (
              <Link to={`/offers/${article._id}`} key={article._id}>
                <article key={article._id}>
                  <div className="card-container">
                    <div>{article.owner.account.username}</div>
                    <div className="card-image">
                      <img
                        src={article.product_image.secure_url}
                        alt={article.product_name}
                      />
                    </div>
                    <p>{article.product_price} €</p>
                    <p>{article.product_details[1]?.TAILLE}</p>
                    <p>{article.product_details[0]?.MARQUE}</p>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
