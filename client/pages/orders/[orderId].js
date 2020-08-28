import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const milliSecLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(milliSecLeft / 1000));
    };

    // Calls the time expiration first time
    findTimeLeft();

    const timerId = setInterval(findTimeLeft, 1000);

    // Clear the timer if the use navigated from this page
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51HJxITBP4HQgGHywfU3u2dR68Sf4VeZoRp55MYgahQmUMxR3h8e7yWLQzfoxhxRNs2biL4CHGMC170LSuiFDKeKI00w59WHKX1"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
