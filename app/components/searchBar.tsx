import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactNode,
  useState,
} from "react";
import eventBus from "./eventBus";
import classNames from "classnames";
import { FC } from "react";

const defaultSearchInputs = {
  cardName: "",
  cardType: "",
  cardEpic: { label: "Any", value: "any" },
  cardPower: "",
  cardGoal: "",
  cardCost: "",
  cardEffect: "",
};

const SearchBar = () => {
  const [searchInputs, setSearchInputs] = useState(defaultSearchInputs);

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchInputs);
    if (typeof document !== "undefined") {
      const searchObj = {
        name: (document.getElementById("cardName") as HTMLInputElement).value,
        type: (document.getElementById("cardType") as HTMLInputElement).value,
        epic: (document.getElementById("cardEpic") as HTMLInputElement).value,
        power: (document.getElementById("cardPower") as HTMLInputElement).value,
        goal: (document.getElementById("cardGoal") as HTMLInputElement).value,
        cost: (document.getElementById("cardCost") as HTMLInputElement).value,
        effect: (document.getElementById("cardEffect") as HTMLInputElement)
          .value,
      };
      eventBus.dispatch("searchSubmit", searchObj);
    }
  };

  const clearInputs = () => {
    setSearchInputs(defaultSearchInputs);
  };

  function handleTextInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSearchInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div
      className={classNames(
        "SEARCHBAR",
        "w-full grid",
        "bg-[#370101]",
        "mb-8 p-4",
        "border-b-4 border-[#ffa800] shadow-lg"
      )}
    >
      <form className="" onSubmit={submitSearch}>
        <div
          className={classNames(
            "grid grid-cols-1 gap-2 mb-4",
            "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
            "xl:grid-cols-5 2xl:grid-cols-6",
            "grid-flow-dense"
          )}
        >
          <SearchInput
            name={"cardName"}
            placeholder="Card name"
            id={"cardName"}
            value={searchInputs.cardName}
            onChange={handleTextInputChange}
          />

          <SearchInput
            id={"cardType"}
            name={"cardType"}
            placeholder={"Type"}
            value={searchInputs.cardType}
            onChange={handleTextInputChange}
          />

          <SelectInput
            className={""}
            id={"cardEpic"}
            name={"cardEpic"}
            placeholder={"Epic?"}
            options={[
              { label: "Any", value: "Any" },
              { label: "Epic", value: "yes" },
              { label: "Not epic", value: "no" },
            ]}
          />
          <SearchInput
            className="grow"
            id={"cardPower"}
            name={"cardPower"}
            placeholder={"Card power"}
            icon={"🛡️"}
            value={searchInputs.cardPower}
            onChange={handleTextInputChange}
          />
          <SearchInput
            id={"cardGoal"}
            name={"cardGoal"}
            placeholder={"Card goal"}
            icon={"❤️"}
            value={searchInputs.cardGoal}
            onChange={handleTextInputChange}
          />
          <SearchInput
            id={"cardCost"}
            name={"cardCost"}
            placeholder={"Card cost"}
            icon={"🌟"}
            value={searchInputs.cardCost}
            onChange={handleTextInputChange}
          />

          <div className="col-span-full lg:col-span-2 xl:col-span-4 2xl:col-span-full">
            <SearchInput
              id={"cardEffect"}
              name={"cardEffect"}
              placeholder="Search card effect..."
              value={searchInputs.cardEffect}
              onChange={handleTextInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <input
            type="submit"
            className={classNames(
              "rounded-full bg-[#ffa800] px-4 py-1",
              "hover:cursor-pointer hover:brightness-75"
            )}
            id="submitCardSearch"
            value="Search"
          />
          <button
            className={classNames(
              "rounded-full bg-green-800 text-white px-4 py-1",
              "hover:cursor-pointer hover:brightness-75"
            )}
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

type SearchInputProps = {
  id: string;
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const SearchInput: FC<SearchInputProps> = ({
  label,
  value,
  placeholder,
  icon,
  name,
  id,
  className,
  onChange,
}) => {
  return (
    <div className={"relative w-full pr-4 text-base"}>
      {label && <label htmlFor={id}>{label}</label>}
      {icon && (
        <div className="absolute top-1/2 -translate-y-1/2 left-5 text-xl">
          {icon}
        </div>
      )}
      <input
        className={classNames(
          icon ? "pl-12" : "pl-4",
          "w-full",
          "rounded-full border-2 p-2 m-2",
          "outline outline-yellow-700",
          "border-yellow-400 bg-[rgba(88,47,41,0.8)]",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]",
          "focus:outline-current",
          "placeholder:text-[rgb(145,99,93)]",
          "text-slate-100",
          className && className
        )}
        name={name}
        id={id}
        placeholder={placeholder ? placeholder : "Search"}
        value={value}
        type="text"
        onChange={onChange}
      />
    </div>
  );
};

type SelectInputOption = {
  value: string;
  label: string;
};

type SelectInputProps = {
  id: string;
  name: string;
  label?: string;
  value?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  options?: SelectInputOption[];
  defaultOption?: SelectInputOption;
};

const SelectInput: FC<SelectInputProps> = ({
  label,
  value,
  placeholder,
  icon,
  name,
  id,
  className,
  options,
  defaultOption,
}) => {
  return (
    <div className={"relative pr-4 text-base "}>
      {label && <label htmlFor={id}>{label}</label>}
      {icon && (
        <div className="absolute top-1/2 -translate-y-1/2 left-5">{icon}</div>
      )}
      <select
        className={classNames(
          icon ? "pl-12" : "pl-4",
          "hover:cursor-pointer",
          "rounded-full border-2 py-2.5 pr-4 m-2",
          "outline outline-yellow-700",
          "border-yellow-400 bg-[rgba(88,47,41,0.8)]",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]",
          "focus:outline-current",
          "placeholder:text-[rgb(145,99,93)]",
          "text-slate-100",
          "w-full",
          className && className
        )}
        name={name}
        id={id}
        placeholder={placeholder ? placeholder : "Search"}
        value={value}
      >
        {options &&
          options.map((opt, index) => (
            <option
              className={"p-2"}
              key={`select-${name}-${id}-${index}`}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
      </select>
    </div>
  );
};
