import React, { useEffect } from "react";
import Select from "react-select";

const days = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => ({
  value: currentYear - i,
  label: `${currentYear - i}`,
}));

const customStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    borderRadius: "8px",
    boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : base.boxShadow,
    borderColor: state.isFocused ? "#3b82f6" : base.borderColor,
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 150,
    overflowY: "auto",
  }),
};

const DateOfBirthSelect = ({ setValue, errors, trigger }) => {
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [selectedYear, setSelectedYear] = React.useState(null);

  // Update form state only when all selections are made
  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      setValue("birthDay", selectedDay.value, { shouldValidate: true });
      setValue("birthMonth", selectedMonth.value, { shouldValidate: true });
      setValue("birthYear", selectedYear.value, { shouldValidate: true });

      trigger(["birthDay", "birthMonth", "birthYear"]);
    }
  }, [selectedDay, selectedMonth, selectedYear, setValue, trigger]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="w-1/3">
          <Select
            options={days}
            placeholder="Ngày"
            styles={customStyles}
            value={selectedDay}
            onChange={setSelectedDay}
          />
          {errors.birthDay && (
            <p className="text-red-500 text-xs mt-1">
              {errors.birthDay.message}
            </p>
          )}
        </div>
        <div className="w-1/3">
          <Select
            options={months}
            placeholder="Tháng"
            styles={customStyles}
            value={selectedMonth}
            onChange={setSelectedMonth}
          />
          {errors.birthMonth && (
            <p className="text-red-500 text-xs mt-1">
              {errors.birthMonth.message}
            </p>
          )}
        </div>
        <div className="w-1/3">
          <Select
            options={years}
            placeholder="Năm"
            styles={customStyles}
            value={selectedYear}
            onChange={setSelectedYear}
          />
          {errors.birthYear && (
            <p className="text-red-500 text-xs mt-1">
              {errors.birthYear.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateOfBirthSelect;
