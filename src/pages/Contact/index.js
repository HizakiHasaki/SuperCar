import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import { Form } from "react-bootstrap";
const cx = classNames.bind(styles);

function Contact() {
  return (
    <div className={cx("contact")}>
      <h1 className={cx("title")}>Contact</h1>
      <Form className={cx("contact-form")}>
        <Form.Group className={cx("form-group")}>
          <Form.Label className={cx("form-label")}>Name</Form.Label>
          <Form.Control
            className={cx("form-input")}
            type="text"
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group className={cx("form-group")}>
          <Form.Label className={cx("form-label")}>Email</Form.Label>
          <Form.Control
            className={cx("form-input")}
            type="email"
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group className={cx("form-group")}>
          <Form.Label className={cx("form-label")}>Message</Form.Label>
          <Form.Control
            className={cx("form-input")}
            as="textarea"
            rows={3}
            placeholder="Enter your message"
          />
        </Form.Group>
        <button className={cx("submit-button")} type="submit">
          Send Message
        </button>
      </Form>
    </div>
  );
}

export default Contact;
