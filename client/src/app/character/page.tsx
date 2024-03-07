import clsx from "clsx";
import TextInput from "../components/TextInput";

export default function CharacterPage() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="text-center">
        <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
          キャラクターの作成
        </h2>
      </div>

      <div className="mt-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">プロフィール</h3>

        <TextInput label="名前" placeholder="山田 花子" />
        <TextInput label="ふりがな" placeholder="やまだ はなこ" />

        <div className="columns-3 gap-2">
          <TextInput label="職業" placeholder="探偵" />
          <TextInput label="年齢" placeholder="35" />
          <TextInput label="性別" placeholder="男性" />
          <TextInput label="住所" placeholder="東京" />
          <TextInput label="出身" placeholder="東京" />
        </div>
      </div>

      <div className="mt-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">能力値</h3>

        <div className="flex flex-row flex-wrap">
          <TextInput label="STR" placeholder="50" />
          <TextInput label="CON" placeholder="50" />
          <TextInput label="POW" placeholder="50" />
          <TextInput label="DEX" placeholder="50" />
          <TextInput label="APP" placeholder="50" />
          <TextInput label="SIZ" placeholder="50" />
          <TextInput label="INT" placeholder="50" />
          <TextInput label="EDU" placeholder="50" />
          <TextInput label="幸運" placeholder="50" />
          <TextInput label="耐久力" placeholder="10" />
          <TextInput label="MP" placeholder="10" />
          <TextInput label="正気度" placeholder="50" />
          <TextInput label="アイデア" placeholder="50" />
          <TextInput label="SAN" placeholder="50" />
          <TextInput label="DB" placeholder="0" />
          <TextInput label="BUILD" placeholder="0" />
          <TextInput label="MOV" placeholder="8" />
        </div>
      </div>

      <div className="mt-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">技能</h3>

        <div className="mt-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">信用</h3>

          <div className="">
            <TextInput label="信用" placeholder="15" />
          </div>
        </div>

        <div className="mt-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">戦闘技能</h3>

          <div className="">
            <TextInput label="回避" placeholder="15" />
            <TextInput label="近接戦闘" placeholder="25" />
            <TextInput label="投擲" placeholder="20" />
            <TextInput label="射撃" placeholder="20" />
          </div>
        </div>

        <div className="mt-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">探索技能</h3>

          <div className="">
            <TextInput label="応急手当" placeholder="30" />
            <TextInput label="鍵開け" placeholder="1" />
            <TextInput label="手さばき" placeholder="10" />
            <TextInput label="聞き耳" placeholder="20" />
          </div>
        </div>

        <div className="mt-5 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">行動技能</h3>

          <div className="">
            <TextInput label="運転" placeholder="15" />
            <TextInput label="機械修理" placeholder="15" />
            <TextInput label="重機械捜査" placeholder="15" />
            <TextInput label="乗馬" placeholder="15" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-x-2">
        <button
          type="button"
          className={clsx(
            "py-2 px-3",
            "inline-flex items-center gap-x-2",
            "text-sm font-medium",
            "rounded-lg",
            "border border-gray-200",
            "bg-white text-gray-800 shadow-sm",
            "hover:bg-gray-50",
            "disabled:opacity-50 disabled:pointer-events-none",
            "dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          )}
        >
          Cancel
        </button>
        <button
          type="button"
          className={clsx(
            "py-2 px-3",
            "inline-flex items-center gap-x-2",
            "text-sm font-semibold",
            "rounded-lg",
            "border border-transparent",
            "bg-blue-600 text-white",
            "hover:bg-blue-700",
            "disabled:opacity-50 disabled:pointer-events-none",
            "dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          )}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
