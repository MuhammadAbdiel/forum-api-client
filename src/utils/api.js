const api = (() => {
  const BASE_URL = "http://localhost:3000";

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function putAccessToken(token) {
    localStorage.setItem("token", token);
  }

  function getAccessToken() {
    return localStorage.getItem("token");
  }

  async function register({ username, password, fullname }) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, fullname }),
    });

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to register");
    }

    const {
      data: { addedUser },
    } = responseJson;
    return addedUser;
  }

  async function login({ username, password }) {
    const response = await fetch(`${BASE_URL}/authentications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to login");
    }

    const {
      data: { accessToken, refreshToken },
    } = responseJson;
    return { accessToken, refreshToken };
  }

  async function createThread({ title, body }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to create thread");
    }

    const {
      data: { addedThread },
    } = responseJson;
    return addedThread;
  }

  async function getAllThread() {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`);

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to get threads");
    }

    const {
      data: { threads },
    } = responseJson;
    return threads;
  }

  async function getThreadById(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}`);

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to get threads");
    }

    const {
      data: { thread },
    } = responseJson;
    return thread;
  }

  async function createComment(threadId, { content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to create comment");
    }

    const {
      data: { addedComment },
    } = responseJson;
    return addedComment;
  }

  async function deleteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to delete comment");
    }
  }

  async function createReply(threadId, commentId, { content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/replies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to create reply");
    }

    const {
      data: { addedReply },
    } = responseJson;
    return addedReply;
  }

  async function deleteReply(threadId, commentId, replyId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/replies/${replyId}`,
      {
        method: "DELETE",
      }
    );

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error("Failed to delete reply");
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    createThread,
    getAllThread,
    getThreadById,
    createComment,
    deleteComment,
    createReply,
    deleteReply,
  };
})();

export default api;
