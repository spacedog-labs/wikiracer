import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import AuthState from "../state/AuthState";
import LobbyState from "../state/LobbyState";

const Article = observer(() => {
  const [article, setArticle] = useState(
    "President_of_the_Policy_and_Resources_Committee_of_Guernsey"
  );
  const [articleData, setArticleData] = useState<any>(undefined);

  useEffect(() => {
    AuthState.getUser();
    LobbyState.getArticle(article, setArticleData);
  }, []);

  console.log(articleData);

  return (
    <div>
      <h1>{AuthState.auth_info?.display_name}</h1>
      <button
        onClick={() => {
          AuthState.logout();
        }}
      >
        Logout
      </button>
      <div>
        <button
          onClick={() => {
            LobbyState.getArticle(article, setArticleData);
          }}
        >
          Load Article
        </button>
        {articleData != undefined ? (
          <div>
            <h1>{articleData!.title}</h1>
            {articleData!.paragraphs.map((paragraph: any, ind: any) => {
              if (paragraph.level === 0) {
                return (
                  <p key={ind}>
                    {paragraph.spans.map((span: any, sind: any) => {
                      if (span.link != null) {
                        return (
                          <a
                            style={{
                              cursor: "pointer",
                              color: "blue",
                              textDecoration: "underline",
                            }}
                            key={sind}
                            onClick={() => {
                              LobbyState.getArticle(span.link, setArticleData);
                            }}
                          >
                            {span.text}
                          </a>
                        );
                      }
                      return <span key={sind}>{span.text}</span>;
                    })}
                  </p>
                );
              }
              if (paragraph.level >= 1) {
                return <h1>{paragraph.spans[0].text}</h1>;
              }
            })}
          </div>
        ) : (
          <div>not loaded</div>
        )}
      </div>
    </div>
  );
});

export default Article;