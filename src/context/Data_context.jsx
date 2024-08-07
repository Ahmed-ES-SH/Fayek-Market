import { useContext, createContext, useState, useEffect } from "react";
import { useFirebase_context } from "./Firebase_Context";

const data = createContext();

const Data_context = ({ children }) => {
  const { getMultipleDocs, Auth } = useFirebase_context();
  const [real, setreal] = useState({});
  const [products, setproducts] = useState([]);
  const [categores, setcategores] = useState([]);
  const [slider_images, setslider_images] = useState([]);
  const [users, setusers] = useState([]);
  const [images, setimages] = useState([]);
  let dd = {};
  useEffect(() => {
    getMultipleDocs("products", (docs) => {
      docs.map((doc) => {
        if (!products.find((product) => product.title === doc.data.title)) {
          products.push(doc.data);
        }
      });
    });
  }, []);

  useEffect(() => {
    getMultipleDocs("slider_images", (docs) => {
      const uniqueImages = docs.reduce((acc, doc) => {
        doc.data.forEach((image) => {
          if (!acc.includes(image)) {
            acc.push(image);
          }
        });
        return acc;
      }, []);

      // الآن، قم بتعيين الحالة بالمصفوفة uniqueImages
      setslider_images(uniqueImages);
    });
  }, []);

  useEffect(() => {
    getMultipleDocs("users", (docs) => {
      // استخدم دالة reduce للتأكد من عدم تكرار العناصر
      const uniqueUsers = docs.reduce(
        (acc, doc) => {
          // التحقق مما إذا كان العنصر موجود بالفعل في المصفوفة أم لا
          const isDuplicate = acc.some(
            (user) => JSON.stringify(user) === JSON.stringify(doc)
          );
          if (!isDuplicate) {
            acc.push(doc);
          }
          return acc;
        },
        [...users]
      );

      setusers(uniqueUsers);
    });
  }, []);

  useEffect(() => {
    getMultipleDocs("products_images", (docs) => {
      docs.map((doc) => {
        images.push(...doc.data);
      });
      images.length = products.length;
    });
  }, []);

  useEffect(() => {
    getMultipleDocs("categores", (docs) => {
      const uniqueCategories = docs.reduce(
        (acc, doc) => {
          const isDuplicate = acc.some(
            (cat) => JSON.stringify(cat) === JSON.stringify(doc)
          );
          if (!isDuplicate) {
            acc.push(doc.data);
          }
          return acc;
        },
        [...categores]
      );
      setcategores(uniqueCategories);
    });
  }, []);

  useEffect(() => {
    users.map((userr) => {
      if (Auth.currentUser.email == userr.data.email) {
        setreal(userr);
      }
    });
  }, []);

  return (
    <data.Provider
      value={{ products, real, images, slider_images, users, categores }}
    >
      {children}
    </data.Provider>
  );
};

export default Data_context;

export const Use_Date = () => {
  return useContext(data);
};
