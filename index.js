const API_KEY = secrets.API_KEY;
const ENDPOINTS = {
  GET_CAT_URL: 'https://api.thecatapi.com/v1/images/search',
  VOTE_CAT_URL: 'https://api.thecatapi.com/v1/votes'
}

const catImg = document.getElementById('cat-image')
const upvoteButton = document.getElementById('upvoteButton')
const downvoteButton = document.getElementById('downvoteButton')

const setCatImg = (imgURL) => {
  catImg.src = imgURL
}

const getCatImage = async () => {
  const res = await fetch(ENDPOINTS.GET_CAT_URL, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
    },
  })
  return res.json()
}

const addVotingButtonEventListener = (buttonElement, voteType, imgId) => {
  buttonElement.addEventListener('click', async function() {
    console.log('button clicked');
    const res = await fetch(ENDPOINTS.VOTE_CAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify({
        "image_id": imgId,
        "value": voteType
      })
    })
    const json = await res.json();
    location.reload();
    console.log('my res', json);
    return json;
  })
}

getCatImage().then((data) => {
  const res = data[0]
  setCatImg(res.url)
  addVotingButtonEventListener(upvoteButton, 1, res.id);
  addVotingButtonEventListener(downvoteButton, 0, res.id);
})
