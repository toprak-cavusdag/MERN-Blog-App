import React from "react";
import PostAuthor from "../component/PostAuthor";
import { Link } from "react-router-dom";
import thumbnail from "../assets/thumbnail.jpg";

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/werwer/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbnail">
          <img src={thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          placeat quo voluptatibus. Necessitatibus molestias veniam eaque
          veritatis deleniti vel tempora? Nihil corporis corrupti similique
          facere illum. Amet corporis provident fuga odio quisquam iure earum
          dolorum distinctio, quidem dolores assumenda asperiores est facere,
          nesciunt ducimus. Pariatur, exercitationem ea reiciendis consequuntur
          molestiae dignissimos in ab dolor doloribus molestias culpa,
          blanditiis libero velit maxime nesciunt unde necessitatibus quaerat
          facilis. Culpa cum illo ab dolorem porro sit saepe. Vitae unde
          possimus omnis ea maiores ipsa ut veritatis, illum atque ad?
          Voluptatem provident laboriosam suscipit mollitia eaque corrupti,
          temporibus consequatur nemo asperiores sunt quas nesciunt maiores,
          voluptate vel? Soluta ullam facilis tempore doloremque et, quam
          debitis possimus ducimus molestiae similique suscipit cumque, cum
          perferendis corrupti.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          cum eaque consequatur libero exercitationem, tenetur numquam
          voluptates ipsa voluptate. Sint fugiat mollitia quos sit, praesentium
          eaque labore quo provident commodi laboriosam velit blanditiis quae
          iure rerum magni qui quasi dolorum deserunt officia tempora eveniet
          temporibus quam voluptatem. Reprehenderit itaque error maxime, velit
          illo asperiores facere.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam cum
          deleniti autem eaque sequi voluptatibus ut, nemo labore architecto
          accusamus unde quis ipsam in culpa cumque et quas? Sunt dolores sit ut
          autem eius. Perferendis ducimus praesentium, officiis magni odio
          provident voluptas soluta tempore nesciunt repudiandae sapiente omnis
          eaque iusto aspernatur quidem ab eligendi. Culpa ut modi sit. Quam
          iste quibusdam enim, aut ipsa ratione aperiam iusto quia deleniti
          labore omnis dolore maiores facere vero possimus laboriosam accusamus
          quas rem reprehenderit? Reiciendis maiores, quam sapiente hic esse
          laborum sunt veniam! Qui numquam dolores repellat a nam cumque
          distinctio at eligendi, aperiam doloribus optio incidunt sit delectus
          ad est! Exercitationem, hic?
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
