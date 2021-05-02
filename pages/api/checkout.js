// import products from "../../products.json";
import QiwiBillPaymentsAPI from "@qiwi/bill-payments-node-js-sdk";

const SECRET_KEY = process.env.QIWI_SECRET_KEY;
const BASE_URL = "http://localhost:3000/";

export default async (req, res) => {
  try {
    const { amount, cart, email } = req.body;
    console.log({ amount, cart, email });

    const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);
    const billId = qiwiApi.generateId();
    console.log({ qiwiApi, billId });

    const fields = {
      amount: amount,
      currency: "RUB",
      comment: `charge for ${JSON.stringify(cart)}`,
      expirationDateTime: qiwiApi.getLifetimeByDay(1),
      email: email,
      account: "client4563",
      successUrl: `${BASE_URL}cart_success"`,
    };
    console.log({ fields });

    // const qiwiApiResponse = await qiwiApi.createBill(billId, fields);
    //fake api call
    const qiwiApiResponse = testQiwiApiCreateBill(true);

    console.log({ qiwiApiResponse });

    res.status(200).json(qiwiApiResponse);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

function testQiwiApiCreateBill(isSuccessfull) {
  if (isSuccessfull) {
    const sucessResponse = {
      siteId: "23044",
      billId: "893794793973",
      amount: {
        value: 100,
        currency: "RUB",
      },
      status: {
        value: "WAITING",
        changedDateTime: "2018-03-05T11:27:41+03:00",
      },
      comment: "Text comment",
      creationDateTime: "2018-03-05T11:27:41",
      expirationDateTime: "2018-04-13T14:30:00+03:00",
      payUrl:
        "https://oplata.qiwi.com/form/?invoice_uid=d875277b-6f0f-445d-8a83-f62c7c07be77",
    };
    return sucessResponse;
  }
  throw {
    serviceName: "invoicing-api",
    errorCode: "auth.unauthorized",
    description: "Неверные аутентификационные данные",
    userMessage: "",
    datetime: "2018-04-09T18:31:42+03:00",
    traceId: "48485a395dfsdf34v124",
  };
}
