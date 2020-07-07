import React, { useState, useEffect } from "react";
import { ListGroupItem, FormCheckbox, ListGroup } from "shards-react";

// class ListSkills extends React.Component {

//   render() {

//     // eslint-disable-next-line no-lone-blocks
//     {
//       return this.props.data.map(item => (
//         <ListGroupItem>
//           {item.name}
//           <FormCheckbox
//             checked={this.props.selectedSkill.includes(item.id)}
//             onChange={e => {this.props.handleAdd(e,item.id);
//               console.log(this.props.selectedSkill.includes(item.id))}}
//           />
//         </ListGroupItem>
//       ));
//     }
//   }
// }

const ListSkills = props => {
  const [skillsSelected, setSkillSelected] = useState([]);

  const onChangeSkill = async item => {
    if (skillsSelected.find(skill => skill.id === item.id)) {
      const newList = skillsSelected.filter(e => e.id !== item.id);
      // console.log(newList)
      await setSkillSelected(newList);
    } else {
      await setSkillSelected([...skillsSelected, item]);
    }

    // console.log(skillsSelected)
    // console.log(item)
    // console.log(skillsSelected.includes(item))
  };

  useEffect(
    () => {
      props.onChange(skillsSelected.map(e => e.id));
    },
    [skillsSelected]
  );
  return (
    <div style={{height: '50vh', overflowY: 'scroll'}}>
      <ListGroup>
        {props.data.map(item => (
          <ListGroupItem key={item.id}>
            {item.name}
            <FormCheckbox
              checked={skillsSelected.includes(item)}
              onChange={() => {
                onChangeSkill(item);
              }}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListSkills;
