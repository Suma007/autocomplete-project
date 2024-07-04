const request = require('supertest');
const express = require('express');
const app = require('../server');

describe('GET /suggestions', () => {
  it('responds with 200 status and returns suggestions for valid query', async () => {
    const response = await request(app).get('/suggestions?q=radio');
    expect(response.status).toBe(200);
    expect(response.body).toContain([
      'Radiohead',
      'Radiohead - The King of Limbs',
      'Radiohead - The King of Limbs - Lotus Flower'
    ]);
  });

  it('responds with 200 status and empty array for invalid query', async () => {
    const response = await request(app).get('/suggestions?q=nonexistent');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('responds with 200 status and returns suggestions case-insensitively', async () => {
    const response = await request(app).get('/suggestions?q=RADIO');
    expect(response.status).toBe(200);
    expect(response.body).toContain([
      'Radiohead',
      'Radiohead - The King of Limbs',
      'Radiohead - The King of Limbs - Lotus Flower'
    ]);
  });

  it('responds with suggestions that match only at the beginning', async () => {
    const response = await request(app).get('/suggestions?q=king');
    expect(response.status).toBe(200);
    expect(response.body).toContain([
      'Radiohead - The King of Limbs',
      'Radiohead - The King of Limbs - Lotus Flower'
    ]);
  });

  it('responds with 400 status and error message when no query is provided', async () => {
    const response = await request(app).get('/suggestions');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'No query parameter provided' });
  });
});

describe('GET /fetchData', () => {
  it('responds with 200 status and returns artist details for valid query', async () => {
    const response = await request(app).get('/fetchData?q=radiohead');
    expect(response.status).toBe(200);
    expect(response.body).toContain({
        name: "Radiohead",
        albums: [
            {
                title: "The King of Limbs",
                songs: [
                    {
                        title: "Bloom",
                        length: "5:15"
                    },
                    {
                        title: "Morning Mr Magpie",
                        length: "4:41"
                    },
                    {
                        title: "Little by Little",
                        length: "4:27"
                    },
                    {
                        title: "Feral",
                        length: "3:13"
                    },
                    {
                        title: "Lotus Flower",
                        length: "5:01"
                    },
                    {
                        title: "Codex",
                        length: "4:47"
                    },
                    {
                        title: "Give Up the Ghost",
                        length: "4:50"
                    },
                    {
                        title: "Separator",
                        length: "5:20"
                    }
                ],
                description: "\nThe King of Limbs is the eighth studio album by English rock band Radiohead, produced by Nigel Godrich. It was self-released on 18 February 2011 as a download in MP3 and WAV formats, followed by physical CD and 12\" vinyl releases on 28 March, a wider digital release via AWAL, and a special \"newspaper\" edition on 9 May 2011. The physical editions were released through the band's Ticker Tape imprint on XL in the United Kingdom, TBD in the United States, and Hostess Entertainment in Japan.\n"
                },
        ]        
    });
  });

  it('responds with 200 status and empty object for invalid query', async () => {
    const response = await request(app).get('/fetchData?q=nonexistent');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  it('responds with 200 status and returns album details when query includes hyphens', async () => {
    const response = await request(app).get('/fetchData?q=radiohead - the king of limbs');
    expect(response.status).toBe(200);
    expect(response.body).toContain({
        name: "Radiohead",
        albums: [
            {
                title: "The King of Limbs",
                songs: [
                    {
                        title: "Bloom",
                        length: "5:15"
                    },
                    {
                        title: "Morning Mr Magpie",
                        length: "4:41"
                    },
                    {
                        title: "Little by Little",
                        length: "4:27"
                    },
                    {
                        title: "Feral",
                        length: "3:13"
                    },
                    {
                        title: "Lotus Flower",
                        length: "5:01"
                    },
                    {
                        title: "Codex",
                        length: "4:47"
                    },
                    {
                        title: "Give Up the Ghost",
                        length: "4:50"
                    },
                    {
                        title: "Separator",
                        length: "5:20"
                    }
                ],
                description: "\nThe King of Limbs is the eighth studio album by English rock band Radiohead, produced by Nigel Godrich. It was self-released on 18 February 2011 as a download in MP3 and WAV formats, followed by physical CD and 12\" vinyl releases on 28 March, a wider digital release via AWAL, and a special \"newspaper\" edition on 9 May 2011. The physical editions were released through the band's Ticker Tape imprint on XL in the United Kingdom, TBD in the United States, and Hostess Entertainment in Japan.\n"
                },
        ]        
    });
  });
});

