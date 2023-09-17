import { i18nPro } from "@/i18npro";

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


describe("Test i18nPro performance", () => {
  const jsonObject: Record<string, string | number> = {};
  const totalTransaltions = 150000;
  for (let i = 1; i <= totalTransaltions; i++) {
    const random = Math.floor(Math.random() * 100);
    const val = random > 50? i :  `value${i}`
    jsonObject[`key${i}`] = val;
  }

  const jsonString = JSON.stringify(jsonObject);

  it('Translation method', async () => {
    console.time(`processed ${totalTransaltions}`);
    await i18nPro.loadLocalMessages("it-IT", jsonString);
    console.timeEnd(`processed ${totalTransaltions}`);
    await i18nPro.loadLocalMessages("en-US", jsonString);
    await i18nPro.loadLocalMessages("en-UK", jsonString);
    const translationCount = 500;
    const timeStart = Date.now();
    for (let i = 0; i <= translationCount; i++) {
      //console.time("processed key2000000");
      i18nPro.t(`key${getRandomInt(1, totalTransaltions)}`);
      //console.timeEnd("processed key2000000");
    }
    const delta = Date.now() - timeStart;
    //console.log(`${delta} ms`);
    console.table(
      [{ translations: translationCount, time: `${delta} ms` }],
      ["translations", "time"]
    );
    expect(delta).toBeLessThanOrEqual(80);
  })
});
