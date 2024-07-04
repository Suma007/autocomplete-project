const request = require('supertest');
const express = require('express');
const app = require('../server');

describe('GET /suggestions', () => {
  it('responds with 200 status and returns suggestions for valid query', async () => {
    const response = await request(app).get('/suggestions?q=radio');
    expect(response.status).toBe(200);
    expect(response.body).toContain('Radiohead');
  });

  it('responds with 200 status and empty array for invalid query', async () => {
    const response = await request(app).get('/suggestions?q=nonexistent');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('responds with 200 status and returns suggestions case-insensitively', async () => {
    const response = await request(app).get('/suggestions?q=RADIO');
    expect(response.status).toBe(200);
    expect(response.body).toContain('Radiohead');
  });

  it('responds with suggestions that match only at the beginning', async () => {
    const response = await request(app).get('/suggestions?q=king');
    expect(response.status).toBe(200);
    expect(response.body).toContain('Radiohead - The King of Limbs');
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
    expect(response.body).toHaveProperty("name","Radiohead");
  });

  it('responds with 200 status and empty object for invalid query', async () => {
    const response = await request(app).get('/fetchData?q=nonexistent');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  it('responds with 200 status and returns album details when query includes hyphens', async () => {
    const response = await request(app).get('/fetchData?q=radiohead - the king of limbs');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name","Radiohead");
  });
});

