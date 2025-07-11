const getBackendLink = (): string => {
    return process.env.REACT_APP_BACKEND_LINK || "http://localhost:3001/";
};

export default getBackendLink;