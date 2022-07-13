const PHOTO_API = "https://hzhp2g40x5.execute-api.us-east-1.amazonaws.com/v1/upload";
const DB_API= "https://hzhp2g40x5.execute-api.us-east-1.amazonaws.com/v1/transaction";
const API_KEY= "berrger62r96dQCYGyT4I42ggk0gvA6y9TnoXMxe";



export const getRecomendations = async (imageSrc) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");

  var body = JSON.stringify({
    name: "reactTest2.png",
    content: imageSrc.slice(23),
    number: Math.floor(Math.random() * 10)
  })
  
  var requestOptions = {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers, body
  };

  return fetch(PHOTO_API, requestOptions)
    .then(res => res.json())
    .then(data => {
      if (data.errorType) {
        return ({songs: [], emotion:undefined })
      }
      return { 
        songs: data?.body?.id || [],
        emotion: data.Emotions,
      }
    })
    .catch(error => { 
      console.log('error', error)
      return ({songs: [], emotion:undefined })
    });
}

export const saveRecomendations = async ({ id, data }) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-api-key", API_KEY);

  var body = JSON.stringify({
    UserId: id,
    Method: "Update",
    SongList: data
  })
  
  var requestOptions = {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers, body
  };

  return fetch(DB_API, requestOptions)
    .then(res => res.text())
    .then(data => {
      return true;
    })
    .catch(error => console.log('error', error));
}

export const getHistory = async (id) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-api-key", API_KEY);

  var body = JSON.stringify({
    UserId: id,
    Method: "GetUser",
    SongList: [ ]
  })
  
  var requestOptions = {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers, body
  };

  return fetch(DB_API, requestOptions)
    .then(res => res.json())
    .then(data => {
      return data.SongList;
    })
    .catch(error => console.log('error', error));
}
