"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QuizCard from "../components/QuizCard";
import { fetchCategories } from "@/api/fetchApi";
import { groupCategories } from "@/utils/groupedCateg";
import { formatGroupName } from "@/utils/formatName";
import { Input, Select, SelectItem } from "@nextui-org/react";

export default function Home() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center py-6">Error loading quizzes!</p>;

  const groupedCategories = groupCategories(data);

  // dropdown select
  const filteredByGroup = selectedGroup
    ? Object.entries(groupedCategories).filter(([group]) =>
        group.toLowerCase().includes(selectedGroup.toLowerCase())
      )
    : Object.entries(groupedCategories);

  // search query
  const filteredCategories = filteredByGroup.map(([group, categories]) => [
    group,
    categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  ]);
  const nonEmptyCategories = filteredCategories.filter(
    ([group, categories]) => categories.length > 0
  );

  return (
    <div className="container my-10 mx-auto md:px-16 px-2">
      <div className="grid lg:grid-cols-2 mb-10">
        <h2 className="text-2xl font-bold lg:mb-0 mb-4">
          Online Quiz Application
        </h2>

        <div className="grid sm:grid-cols-2 gap-3">
          <Input
            label="Search"
            type="text"
            placeholder="Search by quiz name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sm:max-w-md"
          />

          {/* dropdown filter */}
          <Select
            className="sm:max-w-md"
            label="Select a category"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <SelectItem value={""} key={""}>
              All Groups
            </SelectItem>
            {Object.keys(groupedCategories).map((group) => (
              <SelectItem key={group} value={group}>
                {formatGroupName(group)}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* display quizzes */}
      {nonEmptyCategories.map(([group, categories]) => (
        <div key={group} className="mb-14">
          <h3 className="text-xl font-bold mb-3">{formatGroupName(group)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((categ, index) => (
              <QuizCard key={index} categ={categ} id={categ.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
