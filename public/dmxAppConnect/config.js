dmx.config({
  "categories": {
    "data_detailCategory": {
      "meta": [
        {
          "type": "number",
          "name": "id"
        },
        {
          "type": "text",
          "name": "name"
        },
        {
          "type": "text",
          "name": "short_description"
        },
        {
          "type": "text",
          "name": "long_description"
        },
        {
          "type": "text",
          "name": "image"
        }
      ],
      "outputType": "array"
    }
  },
  "products": {
    "data_viewCategory": {
      "meta": [
        {
          "type": "number",
          "name": "id"
        },
        {
          "type": "text",
          "name": "name"
        },
        {
          "type": "text",
          "name": "short_description"
        },
        {
          "type": "text",
          "name": "long_description"
        },
        {
          "type": "text",
          "name": "image"
        }
      ],
      "outputType": "array"
    },
    "data_viewProducts": {
      "meta": [
        {
          "type": "number",
          "name": "id"
        },
        {
          "type": "text",
          "name": "name"
        },
        {
          "type": "number",
          "name": "price"
        },
        {
          "type": "text",
          "name": "short_description"
        },
        {
          "type": "text",
          "name": "long_description"
        },
        {
          "type": "text",
          "name": "image"
        },
        {
          "type": "date",
          "name": "update_date"
        },
        {
          "type": "boolean",
          "name": "live"
        },
        {
          "type": "boolean",
          "name": "fearured"
        },
        {
          "type": "number",
          "name": "category_id"
        }
      ],
      "outputType": "array"
    },
    "data_detailProduct": {
      "meta": [
        {
          "type": "number",
          "name": "id"
        },
        {
          "type": "text",
          "name": "name"
        },
        {
          "type": "number",
          "name": "price"
        },
        {
          "type": "text",
          "name": "short_description"
        },
        {
          "type": "text",
          "name": "long_description"
        },
        {
          "type": "text",
          "name": "image"
        },
        {
          "type": "date",
          "name": "update_date"
        },
        {
          "type": "boolean",
          "name": "live"
        },
        {
          "type": "boolean",
          "name": "fearured"
        },
        {
          "type": "number",
          "name": "category_id"
        }
      ],
      "outputType": "array"
    }
  }
});
