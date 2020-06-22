const mavelCharacterResponse = {
  status: 200,
  statusText: 'OK',
  data: {
    code: 200,
    status: 'Ok',
    copyright: '© 2020 MARVEL',
    attributionText: 'Data provided by Marvel. © 2020 MARVEL',
    attributionHTML: '<a href="http://marvel.com">Data provided by Marvel. © 2020 MARVEL</a>',
    etag: 'cb0b3cff0f3d949bead1f7c02570e8378e12bb04',
    data: {
      offset: 0,
      limit: 1,
      total: 1493,
      count: 1,
      results: [{
        id: 1011175,
        name: 'Aginar',
        description: '',
        modified: '1969-12-31T19:00:00-0500',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
          extension: 'jpg'
        },
        resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011175',
        comics: {
          available: 0,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011175/comics',
          items: [],
          returned: 0
        },
        series: {
          available: 0,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011175/series',
          items: [],
          returned: 0
        },
        stories: {
          available: 0,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011175/stories',
          items: [],
          returned: 0
        },
        events: {
          available: 0,
          collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011175/events',
          items: [],
          returned: 0
        },
        urls: [
          {
            type: 'detail',
            url: 'http://marvel.com/characters/105/aginar?utm_campaign=apiRef&utm_source=f1f7eccae96ae761cd28b9485770cbfd'
          },
          {
            type: 'wiki',
            url: 'http://marvel.com/universe/Aginar?utm_campaign=apiRef&utm_source=f1f7eccae96ae761cd28b9485770cbfd'
          },
          {
            type: 'comiclink',
            url: 'http://marvel.com/comics/characters/1011175/aginar?utm_campaign=apiRef&utm_source=f1f7eccae96ae761cd28b9485770cbfd'
          }
        ]
      }]
    }
  }
}

const mavelCharacterResponseNon200 = {
  status: 200,
  statusText: 'OK',
  data: {
    code: 300
  }
}

module.exports = {mavelCharacterResponse, mavelCharacterResponseNon200};