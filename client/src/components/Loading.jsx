import { LoaderIcon } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate("/" + nextUrl);
      }, 800);
    }
  }, []);

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="border-t-primary h-14 w-14 animate-spin rounded-full border-2"></div>
    </div>
  );
};

export default Loading;
