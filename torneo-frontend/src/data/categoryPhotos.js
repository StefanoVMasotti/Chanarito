import img2020 from "../assets/2020(1).jpg";
import img2020b from "../assets/2020.webp";
import img2019 from "../assets/2019(1).jpeg";
import img2018 from "../assets/2018.jfif";
import img2018b from "../assets/2018()1.jfif";
import img2017a from "../assets/2017(1).jfif";
import img2017b from "../assets/2017.jfif";
import img2016 from "../assets/2016(1).jpg";
import img2015 from "../assets/2015(1).jfif";

export const categoryPhotos = {
  2020: [img2020, img2020b],
  2019: [img2019],
  2018: [img2018, img2018b],
  2017: [img2017a, img2017b],
  2016: [img2016],
  2015: [img2015],
};

export const categories = Object.keys(categoryPhotos)
  .map(Number)
  .sort((a, b) => b - a);
