from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status

from schemas import prompt_schema
from services import openai_service, paraphrase_service, text_service

load_dotenv()

kaizen_v1_router = APIRouter(prefix="/kaizen/v1", tags=["Kaizen API"])


@kaizen_v1_router.post(
    "/summarize",
    response_model=prompt_schema.Response,
    summary="Summarize text"
)
def summarize_text(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt is empty")

    result = text_service.summarize_text(prompt)
    return prompt_schema.Response(result=result)


@kaizen_v1_router.post(
    "/keywords",
    response_model=prompt_schema.Response,
    summary="Extract keywords"
)
def extract_keywords(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt is empty")

    result = text_service.extract_keywords(prompt)
    return prompt_schema.Response(result=result)


@kaizen_v1_router.post(
    "/paraphrase",
    response_model=prompt_schema.Response,
    summary="Paraphrase text"
)
def paraphrase_text(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Empty text")

    result = paraphrase_service.paraphrase_text(prompt)
    return prompt_schema.Response(result=result)


@kaizen_v1_router.post(
    "/chatbot",
    response_model=prompt_schema.Response,
    summary="Prompt a chatbot"
)
def prompt_chatbot_openai(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt is empty")

    response = openai_service.create_completion(prompt)

    return prompt_schema.Response(result=response)


@kaizen_v1_router.post(
    "/task-guide",
    response_model=prompt_schema.Response,
    summary="Generate a task guide"
)
def generate_task_guide(req: prompt_schema.TaskPrompt):
    if not req.title or not req.description:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Title or description is missing")

    prompt = f"""Title: {req.title}, Description: {
        req.description}. Generate a concise step-by-step guide based on the title and description. Include prerequisites, necessary tools, and tips. Cover the process start to finish, addressing challenges and solutions. Do not return title and description, return only result text."""

    response = openai_service.create_completion(prompt)

    return prompt_schema.Response(result=response)
