import React from "react";
import { Image, Card, Icon } from "semantic-ui-react";

const ContactDetail = ({ data }) => {
  return (
    <Card fluid>
      <Image src={data["image"]} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{data["name"]}</Card.Header>
        <Card.Meta>{data["company"]}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="mail" />
          {data["email"]}
        </a>
      </Card.Content>
    </Card>
  );
};

export default ContactDetail;
