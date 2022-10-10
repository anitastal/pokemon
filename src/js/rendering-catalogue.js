const axios = require('axios').default;

export class getApiData {
  constructor() {
    this.searchKey = '';
    this.searchValue = '';
    this.searchParam = '';
  }

  async getParsedApiData() {
    const params = {
      url: `https://www.thecocktaildb.com/api/json/v1/1/${this.param}.php`,
      [this.searchKey]: `${this.value}`,
    };

    try {
      const response = await axios.get(params.url, { params });
      const data = response.data.drinks;

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParsedApiDataIngredient() {
    const params = {
      url: `https://www.thecocktaildb.com/api/json/v1/1/${this.param}.php`,
      [this.searchKey]: `${this.value}`,
    };

    try {
      const response = await axios.get(params.url, { params });
      const data = response.data.ingredients;
      const [result] = data;

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getParsedApiDataRandom() {
    const params = {
      url: `https://www.thecocktaildb.com/api/json/v1/1/random.php
      `,
    };

    try {
      const response = await axios.get(params.url);
      const data = response.data.drinks;
      // const [parsedData] = data;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  get key() {
    return this.searchKey;
  }

  set key(newKey) {
    this.searchKey = newKey;
  }

  get value() {
    return this.searchValue;
  }

  set value(newValue) {
    this.searchValue = newValue;
  }
  get param() {
    return this.searchParam;
  }

  set param(newParam) {
    this.searchParam = newParam;
  }
}
