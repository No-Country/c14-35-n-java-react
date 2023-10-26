import React from "react";

const TestPage = () => {
  return (
    <main className="grid min-h-screen w-full place-items-center">
      <div className="grid w-[40rem] grid-cols-4 gap-2 rounded-xl bg-gray-200 p-2">
        <div>
          <input
            type="radio"
            name="option"
            id="1"
            value="1"
            className="peer hidden"
            checked
          />
          <label
            htmlFor="1"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            1
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="2"
            value="2"
            className="peer hidden"
          />
          <label
            htmlFor="2"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            2
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="3"
            value="3"
            className="peer hidden"
          />
          <label
            htmlFor="3"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            3
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="4"
            value="3"
            className="peer hidden"
          />
          <label
            htmlFor="4"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            4
          </label>
        </div>
      </div>
    </main>
  );
};

export default TestPage;
