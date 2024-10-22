import { api } from "@/lib/api-client";
import { isErrorResponse } from "@/lib/utils";
import { Question, Response } from "@/types/api";
import { useMutation } from 'react-query';

export const createQuestion = async (question: Question): Promise<Response<number>> => {
    const result: Response<number> = {
        statusCode: 0, 
        message: "", 
        data: -1
    };

    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    try {
        const response = await api.post(`/question`, question, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (isErrorResponse(response.data)) {
            result.statusCode = response.data.statusCode;
            result.message = response.data.message;
            result.data = null;
        } else {
            result.data = response.data;
            result.statusCode = 200;
            result.message = "";
        }
    } catch (error) {
        result.statusCode = 500;
        result.message = "An error occurred while creating the question.";
        result.data = null;
    }

    return result;
};

export const uploadQuestionImage = async (questionId: number, imageFile: File): Promise<Response<void>> => {
    const formData = new FormData();
    formData.append("file", imageFile);

    const result: Response<void> = {
        statusCode: 0,
        message: "",
        data: undefined
    };

    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    try {
        const response = await api.post(`question/upload-image/${questionId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${accessToken}`
            },
        });

        if (isErrorResponse(response.data)) {
            result.statusCode = response.data.statusCode;
            result.message = response.data.message;
        } else {
            result.statusCode = 200;
            result.message = "Image uploaded successfully.";
        }
    } catch (error) {
        result.statusCode = 500;
        result.message = "An error occurred while uploading the image.";
    }

    return result;
};

type CreateQuestionWithImageInput = {
  question: Question;
  imageFile?: File;
};

export const createQuestionWithOptionalImage = async ({ question, imageFile }: CreateQuestionWithImageInput): Promise<Response<number>> => {
    // Step 1: Create the question
    const createQuestionResult = await createQuestion(question);

    // If the question is created successfully and there's an image file, upload the image
    if (createQuestionResult.statusCode === 200 && createQuestionResult.data && imageFile) {
        console.log("question id", createQuestionResult.data)
        const uploadImageResult = await uploadQuestionImage(createQuestionResult.data, imageFile);
        if (uploadImageResult.statusCode !== 200) {
            return {
                statusCode: uploadImageResult.statusCode,
                message: "Question created but image upload failed: " + uploadImageResult.message,
                data: createQuestionResult.data,
            };
        }
    }

    return createQuestionResult;
};

export const useCreateQuestionWithOptionalImage = () => {
    return useMutation(createQuestionWithOptionalImage, {
        onError: (error) => {
            console.error('Error creating question:', error);
        },
    });
};
