import React, { ReactNode } from "react";
import eventBus from "./eventBus";
import classNames from "classnames";
import { FC } from "react";

const SearchBar = () => {
  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <div
      className={classNames(
        "SEARCHBAR",
        "w-full grid",
        "bg-[rgb(70,48,38)]",
        "mb-8"
      )}
    >
      <form className="" onSubmit={submitSearch}>
        <div className="grid grid-cols-4 gap-4">
          <div className={"col-span-2"}>
            <SearchInput
              name={"cardName"}
              placeholder="Card name"
              id={"cardName"}
            />

            <SearchInput
              id={"cardType"}
              name={"cardType"}
              placeholder={"Type"}
            />

            <SelectInput
              className={""}
              id={"cardEpic"}
              name={"cardEpic"}
              placeholder={"Epic?"}
              options={[
                { label: "Any", value: "Any" },
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
            />
          </div>

          <div className="col-span-2">
            <SearchInput
              className="grow"
              id={"cardPower"}
              name={"cardPower"}
              placeholder={"Card power"}
              icon={"🛡️"}
            />
            <SearchInput
              id={"cardGoal"}
              name={"cardGoal"}
              placeholder={"Card goal"}
              icon={"❤️"}
            />
            <SearchInput
              id={"cardCost"}
              name={"cardCost"}
              placeholder={"Card cost"}
              icon={"🌟"}
            />
          </div>

          <div className="col-span-full">
            <SearchInput
              id={"cardEffect"}
              name={"cardEffect"}
              placeholder="Enter anything to match..."
            />
          </div>
        </div>
        <div className="">
          <input
            type="submit"
            className={classNames("rounded-full bg-[#ffa800] px-4 py-1")}
            id="submitCardSearch"
            value="Search"
          />
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
};

const SearchInput: FC<SearchInputProps> = ({
  label,
  value,
  placeholder,
  icon,
  name,
  id,
  className,
}) => {
  return (
    <div className={"relative w-full pr-4"}>
      {label && <label htmlFor={id}>{label}</label>}
      {icon && (
        <div className="absolute top-1/2 -translate-y-1/2 left-5">{icon}</div>
      )}
      <input
        className={classNames(
          icon ? "pl-12" : "pl-4",
          "w-full",
          "rounded-full border-2 p-2 m-2",
          "outline outline-yellow-700",
          "border-yellow-400 bg-[rgb(77,23,16)]",
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
    <div className={"relative pr-4"}>
      {label && <label htmlFor={id}>{label}</label>}
      {icon && (
        <div className="absolute top-1/2 -translate-y-1/2 left-5">{icon}</div>
      )}
      <select
        className={classNames(
          icon ? "pl-12" : "pl-4",
          "rounded-full border-2 py-2 pr-4 m-2",
          "outline outline-yellow-700",
          "border-yellow-400 bg-[rgb(77,23,16)]",
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
