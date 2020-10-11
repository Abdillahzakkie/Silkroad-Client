import img1 from "../assets/facilities/home1.jpeg";
import img2 from "../assets/facilities/home2.jpeg";
import img3 from "../assets/facilities/home3.jpg";
import img4 from "../assets/facilities/home4.jpg";
import img5 from "../assets/facilities/home5.jpg";
import img6 from "../assets/facilities/home6.jpg";


export default [
  {
    sys: {
      id: 1,
      seller: "Johnny William",
    },
    fields: {
      name: "product title",
      price: 25.5,
      quantity: 1,
      images: [
        {
          fields: {
            file: {
              url: img1
            }
          }
        },
        {
          fields: {
            file: {
              url: img1
            }
          }
        },
        {
          fields: {
            file: {
              url: img2
            }
          }
        },
        {
          fields: {
            file: {
              url: img3
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: 2,
      seller: "Karry Pitcher"
    },
    fields: {
      name: "product title",
      price: 30.25,
      quantity: 1,
      images: [
        {
          fields: {
            file: {
              url: img2
            }
          }
        },
        {
          fields: {
            file: {
              url: img4
            }
          }
        },
        {
          fields: {
            file: {
              url: img5
            }
          }
        },
        {
          fields: {
            file: {
              url: img6
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: 3,
      seller: "Michael Soft"
    },
    fields: {
      name: "product title",
      price: 20.45,
      quantity: 1,
      images: [
        {
          fields: {
            file: {
              url: img3
            }
          }
        },
        {
          fields: {
            file: {
              url: img6
            }
          }
        },
        {
          fields: {
            file: {
              url: img5
            }
          }
        },
        {
          fields: {
            file: {
              url: img4
            }
          }
        }
      ]
    }
  },
  {
    sys: {
      id: 4,
      seller: "Mary Cool"
    },
    fields: {
      name: "product title",
      price: 15.25,
      quantity: 1,
      images: [
        {
          fields: {
            file: {
              url: img4
            }
          }
        },
        {
          fields: {
            file: {
              url: img3
            }
          }
        },
        {
          fields: {
            file: {
              url: img2
            }
          }
        },
        {
          fields: {
            file: {
              url: img1
            }
          }
        }
      ]
    }
  },
];
