import { Component } from "react";
import { searchReviews } from "../../services/search/search";

export default class Reviews extends Component {
  state = { reviews: null };

  componentDidMount() {
    const { id } = this.props.match.params;

    searchReviews(id).then((reviews) => this.setState({ reviews }));
  }

  render() {
    const { reviews } = this.state;

    return (
      <div>
        {reviews && reviews[0] ? (
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h3>{author}</h3>
                <span>{content}</span>
              </li>
            ))}
          </ul>
        ) : (
          "Not reviews"
        )}
      </div>
    );
  }
}
