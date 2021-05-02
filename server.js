const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const server = express();

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.get("/", createCharge);

const QiwiBillPaymentsAPI = require("@qiwi/bill-payments-node-js-sdk");
const SECRET_KEY = process.env.QIWI_SECRET_KEY;

async function createCharge(req, res) {
  try {
    const { amount, cart, email } = req.body;

    const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY);
    const billId = qiwiApi.generateId();

    const fields = {
      amount: amount,
      currency: "RUB",
      comment: `charge for ${JSON.stringify(cart)}`,
      expirationDateTime: qiwiApi.getLifetimeByDay(1),
      email: email,
      account: "client4563",
      successUrl: "http://test.ru/",
    };

    //uncomment for valid secret key
    // const qiwiApiResponse = await qiwiRestApi.createBill(billId, fields);
    //commnet out for valid secrete key
    const qiwiApiResponse = testQiwiApiCreateBill(false);
    res.json({ message: "payment was successful", qiwiApiResponse });
    // res.redirect(qiwiApiResponse.payUrl);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
}

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

server.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server is listening on port ${3000}`);
});
