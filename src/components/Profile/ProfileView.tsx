import React from "react";

function parseZipCodes(zipCodes: any) {
  if (!zipCodes) return [];
  if (Array.isArray(zipCodes)) return zipCodes;
  try {
    const parsed = JSON.parse(zipCodes);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function ProfileView({ userInfo }: any) {
  const zipCodes = parseZipCodes(userInfo?.zip_codes);

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
              {zipCodes.length > 0
                ? zipCodes.map((item: any, i: number) => {
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
