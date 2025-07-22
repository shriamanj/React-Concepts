import { useState } from "react";
import Button from "../../components/Button";

const Profile = ({ profile }) => {
  const [isFollow, setIsFollow] = useState(false);
  return (
    <div className="border border-black ">
      <div className="pt-4 pl-4 pr-4 flex gap-4">
        <img src={profile.img} className="w-24 rounded-full" />
        <div>
          <p>{profile.name}</p>
          <p>{profile.bio}</p>
          <p>
            {profile.skills.map((skill, index) => (
              <span className="mr-1">
                {index > 0 && "|"} {skill}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
      <Button onClick={() => setIsFollow(!isFollow)}>
        {isFollow == true ? "Un follow" : "Follow"}
      </Button>
      </div>
    </div>
  );
};

export default Profile;

// HTML5 | Javascript | CSS;
