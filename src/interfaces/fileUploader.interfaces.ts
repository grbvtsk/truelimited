import React from "react";

export interface FileUploaderProps {
    onFileChange: (file: File | null) => void;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    isShow: boolean;
    setIsShow: (isShow: boolean) => void;
}
