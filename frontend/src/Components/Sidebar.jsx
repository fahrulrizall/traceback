import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link " href="#">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="/plant"
            onClick={(e) => {
              e.preventDefault();
              navigate("/plant");
            }}
          >
            <i className="bi bi-building-gear"></i>
            <span>Plant</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="/vendor"
            onClick={(e) => {
              e.preventDefault();
              navigate("/vendor");
            }}
          >
            <i className="bi bi-person"></i>
            <span>Vendor</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="/receiving"
            onClick={(e) => {
              e.preventDefault();
              navigate("/receiving");
            }}
          >
            <i className="bi bi-box"></i>
            <span>Receiving</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            href="/trimming"
            onClick={(e) => {
              e.preventDefault();
              navigate("/trimming");
            }}
          >
            <i className="bi bi-scissors"></i>
            <span>Trimming</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-umbrella"></i>
            <span>Retouching</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#charts-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-boxes"></i>
            <span>Packing</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#icons-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-truck"></i>
            <span>Shipment</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}
