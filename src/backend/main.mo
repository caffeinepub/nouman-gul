import Text "mo:core/Text";

actor {
  let name = "Nouman Gul Lal Chuza";
  let tagline = "Building Digital Worlds";
  let bio = "Nouman Gul Lal Chuza is a passionate software developer specializing in web and smart contract development. Always exploring new technologies and creative solutions.";

  type Profile = {
    name : Text;
    tagline : Text;
    bio : Text;
  };

  public query ({ caller }) func getProfile() : async Profile {
    {
      name;
      tagline;
      bio;
    };
  };
};
