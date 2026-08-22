import React from "react";

function ProfileView({ userInfo }: any) {
  return (
    <div className="row">
      <div className="col-md-4">
        <label>Name</label>
        <div className="form-group">{userInfo?.name}</div>
      </div>
      <div className="col-md-4">
        <label>Phone</label>
        <div className="form-group">{userInfo?.phone_number}</div>
      </div>
      <div className="col-md-4">
        <label>Email</label>
        <div className="form-group">{userInfo?.email}</div>
      </div>
      {userInfo?.role_id !== 1 && (
        <div className="col-md-4">
          <label>Franchise Name</label>
          <div className="form-group">{userInfo?.franchise_name}</div>
        </div>
      )}
      <div className="col-md-4">
        <label>Status</label>
        <div className="form-group">
          {userInfo?.status === 1 ? <span style={{ color: "green" }}>Active</span> : <span style={{ color: "red" }}>Inactive</span>}
        </div>
      </div>
      <div className="col-md-12">
        <hr />
      </div>
      <div className="col-md-4">
        <label>State</label>
        <div className="form-group">{userInfo.state || "---"}</div>
      </div>
      <div className="col-md-4">
        <label>District</label>
        <div className="form-group">{userInfo.district || "---"}</div>
      </div>
      {userInfo.role_id !== 3 && (
        <div className="col-md-12">
          <>
            <label style={{ marginTop: 10 }}>List Of Pin Codes:</label>
            <div className="border p-3">
              {userInfo?.zip_codes && JSON.parse(userInfo.zip_codes).length > 0
                ? JSON.parse(userInfo.zip_codes).map((item: any, i: boolean) => {
                    console.log("item.zip_codes = ", item);
                    return (
                      <div className="form-check form-check-inline mb-2" key={`zip_${i}`}>
                        {item}
                      </div>
                    );
                  })
                : "No Pin Codes Added"}
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
