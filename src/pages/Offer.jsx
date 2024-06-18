import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate("/payment", {
      state: { title: data.product_name, price: data.product_price },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-picture">
          <img src={data.product_image.secure_url} alt={data.product_name} />
        </div>
        <div className="offer-details">
          <p className="offer-price">{data.product_price} €</p>
          <div className="offer-product-details">
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              const key = keys[0];
              return (
                <div key={index} className="detail-item">
                  <span className="detail-key">{key}:</span>{" "}
                  <span className="detail-value">{detail[key]}</span>
                </div>
              );
            })}
          </div>
          <div className="text">
            {" "}
            <div className="offer-title-description">
              <h2 className="offer-title">{data.product_name}</h2>
              <p className="offer-description">{data.product_description}</p>
            </div>
            <div className="seller-info">
              <img
                src={data.owner.account.avatar.secure_url}
                alt={data.owner.account.username}
                className="seller-avatar"
              />
              <span className="seller-username">
                {data.owner.account.username}
              </span>
            </div>
          </div>

          <button onClick={handleBuy} className="buy-button">
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
