﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Entity
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class OasEntities : DbContext
    {
        public OasEntities()
            : base("name=OasEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<category> categories { get; set; }
        public virtual DbSet<question> questions { get; set; }
        public virtual DbSet<role> roles { get; set; }
        public virtual DbSet<subcategory> subcategories { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<test> tests { get; set; }
        public virtual DbSet<topic> topics { get; set; }
        public virtual DbSet<user> users { get; set; }
        public virtual DbSet<userTest> userTests { get; set; }
        public virtual DbSet<userTestAnswer> userTestAnswers { get; set; }
    }
}