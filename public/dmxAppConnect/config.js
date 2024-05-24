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
  },
  "index": {
    "data_viewFeaturedProducts": {
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
          "name": "featured"
        },
        {
          "type": "number",
          "name": "category_id"
        }
      ],
      "outputType": "array"
    },
    "repeatProducts": {
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
          "name": "featured"
        },
        {
          "type": "number",
          "name": "category_id"
        }
      ],
      "outputType": "array"
    },
    "data_viewFeatured": {
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
          "name": "featured"
        },
        {
          "type": "number",
          "name": "category_id"
        }
      ],
      "outputType": "array"
    },
    "repeat1": {
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
          "name": "featured"
        },
        {
          "type": "number",
          "name": "category_id"
        }
      ],
      "outputType": "array"
    }
  },
  "main": {
    "localStorage": [
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
        "type": "number",
        "name": "quantity"
      }
    ],
    "dsCart": [
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
        "type": "number",
        "name": "quantity"
      }
    ]
  }
});
