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
      throw new Error(responseJson.message);
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
      throw new Error(responseJson.message);
    }

    const {
      data: { accessToken, refreshToken },
    } = responseJson;
    return { accessToken, refreshToken };
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error(responseJson.message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function getUserById(userId) {
    const response = await _fetchWithAuth(`${BASE_URL}/users/${userId}`);
    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error(responseJson.message);
    }

    const {
      data: { user },
    } = responseJson;
    return user;
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
      throw new Error(responseJson.message);
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
      throw new Error(responseJson.message);
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
      throw new Error(responseJson.message);
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
      throw new Error(responseJson.message);
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
      throw new Error(responseJson.message);
    }
  }

  async function getCommentById(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}`
    );

    const responseJson = await response.json();
    const { status } = responseJson;

    if (status !== "success") {
      throw new Error(responseJson.message);
    }

    const {
      data: { comment },
    } = responseJson;
    return comment;
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
      throw new Error(responseJson.message);
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
      throw new Error(responseJson.message);
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getUserById,
    createThread,
    getAllThread,
    getThreadById,
    createComment,
    deleteComment,
    getCommentById,
    createReply,
    deleteReply,
  };
})();

export default api;
