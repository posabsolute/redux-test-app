import React from 'react';
import 'style!./comment.scss';
import Textarea from 'components/form/Textarea';


export default ({validate, onSubmit}) => (
  <form className="form-comment" onSubmit={onSubmit}>
    <Textarea
      name="comment"
      placeholder="Your Comment"
      classes="textarea--gray"
      errorLabel="true"
      validate={validate}
    />
    <div className="relative"><button type="submit" className="btn btn-default btn-full" >Add Comment</button></div>
  </form>
);
