import store from "@/redux/store";

export const makeHTTPCall = async (endPoint, type, isToken, body) => {
  try {
    const options = {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (isToken) {
      const state = store.getState();
      options.headers[
        "Authorization"
      ] = `Bearer ${state.userCredentials.token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    console.log(options);

    const response = await fetch(
      `http://localhost:3000/api/v1/${endPoint}`,
      options
    );

    if (response.error === true) {
      throw new Error(response.message);
    }

    return await response.json();
  } catch (error) {
    console.error("Error making API call:", error);
    return { error: error.message };
  }
};
