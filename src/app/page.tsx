"use client";
import useDebounce from "@/hooks/useDebounce";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface Notice {
  forename: string;
  date_of_birth: string;
  entity_id: string;
  nationalities: null;
  name: string;
  _links: Links;
}

export interface Links {
  self: Images;
  images: Images;
  thumbnail: Images;
}

export interface Images {
  href: string;
}

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    //search the api

    async function fetchData() {
      setLoading(true);

      // setNotices([]);
      const data = await fetch(
        `https://ws-public.interpol.int/notices/v1/red?forename=${debouncedSearch}&resultPerPage=200`
      ).then((res) => res.json());

      setNotices(data._embedded.notices);
      setLoading(false);
    }
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col justify-center mt-8 items-center">
      <input
        className="h-10 p-4 border-2 border-black rounded-md"
        type="search"
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {loading && <p>Searching....</p>}
      <div className="mt-5">
        {notices.map((notice) => {
          return (
            <div
              key={notice.entity_id}
              className="flex flex-col justify-center items-center border-2 border-slate-950 mt-5 bg-red-400 "
            >
              {notice._links?.thumbnail?.href && (
                <Image
                  src={notice._links.thumbnail.href}
                  width={100}
                  height={100}
                  alt={notice.name}
                />
              )}
              <div className="flex flex-col justify-center items-center mt-1">
                <p>
                  {notice.forename} {notice.name}
                </p>
                <p>{notice.date_of_birth}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
