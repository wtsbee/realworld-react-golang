import axios from "axios";
import { useState } from "react";
import { ArticleForEditor } from "../../../types/article";

function NewArticle() {
  const [input, setInput] = useState<ArticleForEditor>({
    title: "",
    description: "",
    body: "",
    tag: "",
    tagList: [],
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const params = {
      article: {
        title: input.title,
        description: input.description,
        body: input.body,
        tagList: input.tagList,
      },
    };
    console.log("params:", params);
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.Authorization = `Token ${token}`;
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/articles`,
      data: params,
    });
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.tagList.includes(input.tag) || input.tag === "") {
        return;
      }
      setInput({ ...input, tag: "", tagList: [...input.tagList, input.tag] });
    }
  };

  const onRemoveItem = (target: string) => {
    setInput({
      ...input,
      tagList: input.tagList.filter((tag) => tag !== target),
    });
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                    value={input.title}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    value={input.description}
                    className="form-control"
                    placeholder="What's this article about?"
                    name="description"
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    name="body"
                    value={input.body}
                    onChange={handleChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    name="tag"
                    value={input.tag}
                    onChange={handleChange}
                    onKeyDown={addTag}
                  />
                  <div className="tag-list">
                    {input.tagList.map((value) => (
                      <span key={value} className="tag-default tag-pill">
                        <i
                          className="ion-close-round"
                          onClick={() => onRemoveItem(value)}
                        ></i>
                        {value}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary bg-green-10"
                  type="button"
                  onClick={onSubmit}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArticle;
