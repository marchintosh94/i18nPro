import { I18Dictionary, I18Message, useI18nPro } from "@marchintosh94/i18npro-react";
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  const {t, switchLanguage, locale} = useI18nPro()
  const words = ['Tree', 'Dark', 'Fish', 'Food', 'Law', 'Life', 'Love', 'Near', 'Owl', 'Phone']
  const [dictionary, setDictionary]= useState<I18Dictionary>({})
  const [time, setTime]= useState<string>()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString(locale))
    }, 1000)

    return () => {
      timer
    }
  }, [])

  useEffect(() => {
    // const jsonObject: Record<string, string | number> = {};
    // const totalTransaltions = 150000;
    // for (let i = 1; i <= totalTransaltions; i++) {
    //   const random = Math.floor(Math.random() * 100);
    //   const val = random > 50? i :  `value${i}`
    //   jsonObject[`key${i}`] = val;
    // }

    // const jsonString = JSON.stringify(jsonObject);
    // switchLanguage("en-US", jsonString)
    // //.then(lang => {setDictionary((state) => ({...state, [lang!]: jsonObject}))})
    // switchLanguage("de", jsonString)
    // //.then(lang => {setDictionary((state) => ({...state, [lang!]: jsonObject}))})
    // switchLanguage("es", jsonString)
    // //.then(lang => {setDictionary((state) => ({...state, [lang!]: jsonObject}))})
  }, [])


  const changeLanguage = (lang: string) => {
    fetch(`/${lang}.json`)
      .then(res => res.json())
      .then((dictionary: I18Message) => {
        setDictionary((state) => ({...state, [lang]: dictionary}))
        return switchLanguage(lang, dictionary)
      })
  }


  return (
    <main className="main-container px-2">
      <Navbar />

      <section>
        <h2>{t('Language', 2)}:</h2>
        <div className="flex flex-grow items-center gap-x-3">
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('it')}>IT</button>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:max-w-7xl lg:m-auto">
        <section className="space-y-5">
          <h2>{t('Translation', 2)}</h2>
          <ul role="list" className="divide-y divide-slate-50/5">
            {
              words.map((w, i) => (
                <li key={`${w}_${i}`} className="flex items-center justify-between w-full py-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-none rounded-full p-1 text-gray-500 bg-gray-100/10">
                      <div className="h-2 w-2 rounded-full bg-current"></div>
                    </div>
                    <span>{w}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-50 h-4 w-5" viewBox="0 0 512 512"><path d="M352 184l0-49.3c0-3.7 3-6.7 6.7-6.7c1.9 0 3.7 .8 5 2.2L476.2 256 363.7 381.8c-1.3 1.4-3.1 2.2-5 2.2c-3.7 0-6.7-3-6.7-6.7l0-49.3c0-17.7-14.3-32-32-32L48 296c-8.8 0-16-7.2-16-16l0-48c0-8.8 7.2-16 16-16l272 0c17.7 0 32-14.3 32-32zm154.7 86c3.4-3.8 5.3-8.8 5.3-14s-1.9-10.1-5.3-14L387.5 108.9c-7.3-8.2-17.8-12.9-28.8-12.9c-21.4 0-38.7 17.3-38.7 38.7l0 17.3 0 32-32 0L48 184c-26.5 0-48 21.5-48 48l0 48c0 26.5 21.5 48 48 48l240 0 32 0 0 32 0 17.3c0 21.4 17.3 38.7 38.7 38.7c11 0 21.5-4.7 28.8-12.9L506.7 270z"/></svg>
                  <span>{t(w)}</span> 
                </li>
              ))
            }
            <li className="flex items-center justify-between w-full py-4">
              <div className="flex items-center space-x-2">
                <div className="flex-none rounded-full p-1 text-gray-500 bg-gray-100/10">
                  <div className="h-2 w-2 rounded-full bg-current"></div>
                </div>
                <span>Time</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-slate-50 h-4 w-5" viewBox="0 0 512 512"><path d="M352 184l0-49.3c0-3.7 3-6.7 6.7-6.7c1.9 0 3.7 .8 5 2.2L476.2 256 363.7 381.8c-1.3 1.4-3.1 2.2-5 2.2c-3.7 0-6.7-3-6.7-6.7l0-49.3c0-17.7-14.3-32-32-32L48 296c-8.8 0-16-7.2-16-16l0-48c0-8.8 7.2-16 16-16l272 0c17.7 0 32-14.3 32-32zm154.7 86c3.4-3.8 5.3-8.8 5.3-14s-1.9-10.1-5.3-14L387.5 108.9c-7.3-8.2-17.8-12.9-28.8-12.9c-21.4 0-38.7 17.3-38.7 38.7l0 17.3 0 32-32 0L48 184c-26.5 0-48 21.5-48 48l0 48c0 26.5 21.5 48 48 48l240 0 32 0 0 32 0 17.3c0 21.4 17.3 38.7 38.7 38.7c11 0 21.5-4.7 28.8-12.9L506.7 270z"/></svg>
              <span>{t('Time', {time})}</span> 
            </li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>{t('Dictionary')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {Object.keys(dictionary).map(key => (
              <div key={key}>
                <h3 className="uppercase font-medium">{key}</h3>
                <pre key={key} className="text-xs overflow-hidden text-ellipsis">{JSON.stringify(dictionary[key], null, 2)}</pre>
              </div>
            ))}
          </div>
        </section>
      </div>

    </main>
  );
}

export default App;
