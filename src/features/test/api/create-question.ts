import { api } from "@/lib/api-client";
import { isErrorResponse } from "@/lib/utils";
import { Question, Response } from "@/types/api";

export const createQuestion = async (question: Question): Promise<Response<Question>> => {
    const result: Response<Question> = {
        statusCode: 0, 
        message: "", 
        data: {} as Question
    };
    const response = await api.post(`/question`, question);
    if (isErrorResponse(response.data)) {
        result.statusCode = response.data.statusCode
        result.message = response.data.message;
        result.data = null
    } else {
        result.data = response.data,
        result.statusCode = 200,
        result.message = ""
    }
    return result;
};

export const uploadQuestionImage = async (questionId: number, imageFile: File): Promise<Response<void>> => {
    const formData = new FormData();
    formData.append("file", imageFile); // Append the image file to FormData

    const result: Response<void> = {
        statusCode: 0,
        message: "",
        data: undefined
    };

    try {
        const response = await api.post(`question/upload-image/${questionId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Ensure it's multipart form
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

// Function to handle creating the question, optionally uploading the image
export const createQuestionWithOptionalImage = async (question: Question, imageFile?: File): Promise<Response<Question>> => {
    // Step 1: Create the question
    const createQuestionResult = await createQuestion(question);
    console.log(createQuestionResult.statusCode, createQuestionResult.data)
    // If the question is created successfully and there's an image file, upload the image
    if (createQuestionResult.statusCode === 200 && createQuestionResult.data) {
        if (imageFile) {
            // Step 2: Upload the image if provided
            const uploadImageResult = await uploadQuestionImage(Number(createQuestionResult.data), imageFile);
            if (uploadImageResult.statusCode !== 200) {
                return {
                    statusCode: uploadImageResult.statusCode,
                    message: "Question created but image upload failed: " + uploadImageResult.message,
                    data: createQuestionResult.data,
                };
            }
        }

        // Return the result of question creation
        return createQuestionResult;
    }

    return createQuestionResult; // Return if question creation failed
};