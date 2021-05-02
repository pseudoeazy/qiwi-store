import redirect from "nextjs-redirect";
const sessionToken =
  "2tbp1WQvsgQeziGY9vTLe9vDZNg7tmCymb4Lh6STQokqKrpCC6qrUUKEDZAJ7mvFnzr1yTebUiQaBLDnebLMMxL8ncQ6FF5JHXmCW";

const apiRequest = ({ url, body = undefined, method = "GET" }) =>
  fetch(url, {
    method,
    body: typeof body === "undefined" ? body : JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
    credentials: "include",
  });

export const checkOut = async (fields) => {
  try {
    const apiResponse = await apiRequest({
      url: `/api/checkout`,
      body: fields,
      method: "POST",
    });
    return await apiResponse.json();
  } catch (e) {
    console.log("an error occurred while trying to checkout", e.message);
    return e.message;
  }
};

export const CheckOutRedirect = ({ url }) => {
  const Redirect = redirect(url);
  return (
    <Redirect>
      <p style={{ margin: "1em auto", padding: "1em", width: 300 }}>
        Redirecting to qiwipay! ....
      </p>
    </Redirect>
  );
};
