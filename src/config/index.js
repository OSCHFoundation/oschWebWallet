import oschICon from "@/assets/img/u15.png";
import hourICon from "@/assets/img/u259.png";
import timeICon from "@/assets/img/u269.png";
import OschSdk from "osch-sdk";
const { Asset } = OschSdk;
const timeObj = new Asset(
  "time",
  "GDH2OGN3UJXKIVYELLPCJUSNG7KBNHYSA5QFIV2ZZWUJJAWYDQAAFJZW"
);
const hourObj = new Asset(
  "hour",
  "GA2KXCLNAECHU37B66DZISGFZG73JUYFEDNS3U7Q2O7LJORDYWSZ4W74"
);
const oschObj = Asset.native()
const config = {
  assetList: {
    OSCH: {
      price: 0,
      sumprice: 0,
      ico: oschICon,
      obj: oschObj
    },
    TIME: {
      asset_code: "time",
      asset_issuer: "GDH2OGN3UJXKIVYELLPCJUSNG7KBNHYSA5QFIV2ZZWUJJAWYDQAAFJZW",
      ico: timeICon,
      obj: timeObj
    },
    HOUR: {
      asset_code: "hour",
      asset_issuer: "GA2KXCLNAECHU37B66DZISGFZG73JUYFEDNS3U7Q2O7LJORDYWSZ4W74",
      obj: hourObj,
      ico: hourICon
    },
    arr: ["OSCH", "TIME", "HOUR"],
    activeArr: ["OSCH"]
  }
};
export default config;
